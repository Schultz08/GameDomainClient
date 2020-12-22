

const LeaderBoardsDisplay = (props: any) => {
    return (
        <div>
            {

                props.players.map((player: any, index: number) => {
                    return (

                        <div>
                            <p>{player.gameName}</p>
                            <p>{player.user.userName}</p>
                            <p>{player.score}</p>
                        </div>
                    )
                })
            }
        </div>

    )

}

export default LeaderBoardsDisplay;