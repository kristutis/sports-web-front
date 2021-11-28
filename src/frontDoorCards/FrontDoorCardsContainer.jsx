import React from 'react'
import FrontDoorCard from './FrontDoorCard'
import './FrontDoorCardsContainer.css'

export default function FrontDoorCardsContainer() {
    return (
        <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <FrontDoorCard
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <FrontDoorCard
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <FrontDoorCard
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <FrontDoorCard
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <FrontDoorCard
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
    )
}
