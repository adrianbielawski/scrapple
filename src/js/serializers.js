import moment from 'moment';

export const listDeserializer = (data, itemDeserializer) => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    next: data.next,
    previous: data.previous,
    results: data.results.map(itemDeserializer)
})

export const gameDeserializer = game => ({
    id: game.id,
    number: game.number,
    createdBy: game.created_by,
    createdAt: moment(game.created_at),
    startedAt: game.started_at && moment(game.started_at),
    finishedAt: game.finished_at && moment(game.finished_at),
    timeLimit: game.time_limit,
    language: game.language,
})

export const userDeserializer = (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    isAnonymous: user.is_anonymous,
})

export const playerDeserializer = (player) => ({
    gameId: player.game_id,
    user: userDeserializer(player.user),
    position: player.position,
    score: player.score,
    bestScore: player.best_score,
})