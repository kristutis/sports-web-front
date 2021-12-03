import React from 'react'
import FrontDoorCardsContainer, { CARDS_PLACEMENT } from '../../frontDoorCards/FrontDoorCardsContainer'
import FrontDoorVideo from '../../frontDoorVideo/FrontDoorVideo'

const title = 'Check out these EPIC discounts!'
const cardsData = Array(5).fill(
    {
        src: 'https://urec.uark.edu/_resources/images/fitness_wellness/personal-trainer-1-compressor.jpg',
        text: 'Explore our new deals from only $20',
        label: '50% off!',
        path: '/services',
    }
)

export default function Home() {
    return (
        <div>
            <FrontDoorVideo/>
            <FrontDoorCardsContainer data={cardsData} placement={CARDS_PLACEMENT[0]} title={title}/>
        </div>
    )
}
