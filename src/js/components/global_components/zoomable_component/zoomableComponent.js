import React, { useState, useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { clamp } from 'lodash';
import styles from './zoomableComponent.scss';

const ZoomableComponent = (props) => {
    const wrapper = useRef(null);
    const content = useRef(null);
    const [startDistance, setStartDistance] = useState(null);
    const [startScale, setStartScale] = useState(1);
    const [scale, setScale] = useState(1);
    const [midPoint, setMidPoint] = useState({ x: 0, y: 0 })
    const [startMove, setStartMove] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [translateClamp, setTranslateClamp] = useState(null);
    const margin = 5;

    useEffect(() => {
        setStartScale(1);
        setScale(1);
        setMidPoint({ x: 0, y: 0 });
        setStartMove({ x: 0, y: 0 });
        setTranslate({ x: 0, y: 0 });
        setTranslateClamp(null);
    }, [props.deviceOrientation])

    const handleTouchStart = useCallback((e) => {
        if (e.touches.length === 1) {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            setStartMove({ x, y });
            updateTranslateClamp();
        }
    })

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 1 && scale > 1 && startMove) {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            const newTranslateX = clamp(
                x - startMove.x + translate.x,
                translateClamp.minX,
                translateClamp.maxX
            );

            const newTranslateY = clamp(
                y - startMove.y + translate.y,
                translateClamp.minY,
                translateClamp.maxY
            );

            setTranslate({ x: newTranslateX, y: newTranslateY })
        }

        if (e.touches.length === 2) {
            const [touch1, touch2] = e.touches;
            const distance = Math.sqrt(
                Math.pow(
                    Math.abs(touch1.clientX - touch2.clientX), 2) +
                Math.pow(
                    Math.abs(touch1.clientY - touch2.clientY), 2)
            );

            if (startDistance === null) {
                setStartDistance(distance);
                return;
            }

            const wrapperD = wrapper.current.getBoundingClientRect();

            const midPointX = clamp(
                (touch1.clientX + touch2.clientX) / 2 - wrapperD.left,
                -margin,
                wrapperD.width - margin * 2
            )
            const midPointY = clamp(
                (touch1.clientY + touch2.clientY) / 2 - wrapperD.top,
                -margin,
                wrapperD.height - margin * 2
            )
            setMidPoint({ x: midPointX, y: midPointY })

            const newScale = clamp(startScale * distance / startDistance, 1, 3);
            setScale(newScale)
            if (newScale <= 1) {
                setTranslate({ x: 0, y: 0 })
            }
        }
    }, [startDistance, startMove, scale])

    const handleTouchEnd = useCallback(() => {
        setStartDistance(null);
        setStartScale(scale);
        setStartMove(null);
        updateTranslateClamp();
    }, [scale])

    const updateTranslateClamp = () => {
        const wrapperD = wrapper.current.getBoundingClientRect();
        const contentD = content.current.getBoundingClientRect();

        const maxX = wrapperD.x - contentD.x + translate.x + margin;
        const maxY = wrapperD.y - contentD.y + translate.y + margin;
        const minX = maxX + wrapperD.width - contentD.width - margin * 2;
        const minY = maxY + wrapperD.height - contentD.height - margin * 2;
        setTranslateClamp({ maxX, maxY, minX, minY });
    }

    return (
        <div className={`${styles.wrapper} ${props.className}`} style={props.style} ref={wrapper}>
            <div
                className={props.contentClassName}
                style={ { 
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    transformOrigin: `${midPoint.x}px ${midPoint.y}px`
                }}
                onTouchStart={props.isZoomable ? handleTouchStart : undefined}
                onTouchMove={props.isZoomable ? handleTouchMove : undefined}
                onTouchEnd={props.isZoomable ? handleTouchEnd : undefined}
                ref={content}
            >
                {props.children}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deviceOrientation: state.app.deviceOrientation,
    }
}

export default connect(mapStateToProps)(ZoomableComponent);