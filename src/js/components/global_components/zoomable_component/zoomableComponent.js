import React, { useState, useCallback, useRef } from 'react';
import styles from './zoomableComponent.scss';

const ZoomableComponent = (props) => {
    const zoomableComponent = useRef(null);
    const content = useRef(null);
    const [startDistance, setStartDistance] = useState(null);
    const [startScale, setStartScale] = useState(1);
    const [scale, setScale] = useState(1);
    const [startMove, setStartMove] = useState({x: 0, y: 0});
    const [translate, setTranslate] = useState({x: 0, y: 0});
    const [maxTranslateX, setMaxTranslateX] = useState(null);
    const [maxTranslateY, setMaxTranslateY] = useState(null);
    const [minTranslateX, setMinTranslateX] = useState(null);
    const [minTranslateY, setMinTranslateY] = useState(null);
    
    const handleTouchStart = useCallback((e) => {
        if (e.touches.length === 1) {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            setStartMove({x, y});
            const zoomableComponentD = zoomableComponent.current.getBoundingClientRect();
            const contentD = content.current.getBoundingClientRect();

            const maxX = zoomableComponentD.x - contentD.x + translate.x + 5;
            const maxY = zoomableComponentD.y - contentD.y + translate.y + 5;
            const minX = zoomableComponentD.x + zoomableComponentD.width - contentD.x - contentD.width + translate.x - 5;
            const minY = zoomableComponentD.y + zoomableComponentD.height - contentD.y - contentD.height + translate.y - 5;
            setMaxTranslateX(maxX);
            setMaxTranslateY(maxY);
            setMinTranslateX(minX);
            setMinTranslateY(minY);
        }
    })

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 1 && scale > 1 && startMove) {

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            let newTranslateX = x - startMove.x + translate.x;
            let newTranslateY = y - startMove.y + translate.y;

            if (newTranslateX >= maxTranslateX) {
                newTranslateX = maxTranslateX
            }

            if (newTranslateY >= maxTranslateY) {
                newTranslateY = maxTranslateY
            }

            if (newTranslateX <= minTranslateX) {
                newTranslateX = minTranslateX
            }

            if (newTranslateY <= minTranslateY) {
                newTranslateY = minTranslateY
            }

            setTranslate({x: newTranslateX, y: newTranslateY})
        }

        if (e.touches.length === 2) {
            const distance = Math.sqrt(
                Math.pow(
                    Math.abs(e.touches[0].clientX - e.touches[1].clientX), 2) +
                Math.pow(
                    Math.abs(e.touches[0].clientY - e.touches[1].clientY), 2)
            );

            if (startDistance === null) {
                setStartDistance(distance);
                return;
            }

            let _scale = startScale * distance / startDistance;
            if (_scale < 1) {
                _scale = 1;
            }
            if (_scale > 3) {
                _scale = 3;
            }
            const zoomableComponentD = zoomableComponent.current.getBoundingClientRect();
            const zoomableComponentX = zoomableComponentD.left;
            const zoomableComponentY = zoomableComponentD.top;

            const midPointX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - zoomableComponentX;
            const midPointY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - zoomableComponentY;

            if (midPointX <= -5) {
                midPointX = -5;
            }

            if (midPointY <= -5) {
                midPointY = -5;
            }

            if (midPointX >= zoomableComponentD.width - 10) {
                midPointX = zoomableComponentD.width - 10;
            }

            if (midPointY >= zoomableComponentD.height - 10) {
                midPointY = zoomableComponentD.height - 10;
            }

            content.current.style.transformOrigin = `${midPointX}px ${midPointY}px`;
            setScale(_scale)
            if (_scale <= 1) {
                setTranslate({x: 0, y: 0})
            }
        }
    }, [startDistance, startMove, scale])

    const handleTouchEnd = useCallback((e) => {
        setStartDistance(null);
        setStartScale(scale);
        setStartMove(null);
        const zoomableComponentD = zoomableComponent.current.getBoundingClientRect();
        const contentD = content.current.getBoundingClientRect();

        const maxX = zoomableComponentD.x - contentD.x + translate.x + 5;
        const maxY = zoomableComponentD.y - contentD.y + translate.y + 5;
        const minX = zoomableComponentD.x + zoomableComponentD.width - contentD.x - contentD.width + translate.x - 5;
        const minY = zoomableComponentD.y + zoomableComponentD.height - contentD.y - contentD.height + translate.y - 5;
        setMaxTranslateX(maxX);
        setMaxTranslateY(maxY);
        setMinTranslateX(minX);
        setMinTranslateY(minY);
    }, [scale])

    return (
        <div className={`${styles.zoomableComponent} ${props.className}`} ref={zoomableComponent}>
            <div className={props.contentClassName}
                style={{transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={content}
            >
                {props.children}
            </div>
        </div>
    )
}

export default ZoomableComponent;