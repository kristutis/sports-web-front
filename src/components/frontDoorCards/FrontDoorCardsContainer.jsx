import React from 'react'
import FrontDoorCard from './FrontDoorCard'
import './FrontDoorCardsContainer.css'

export const CARDS_PLACEMENT = [
  'front-door',
  'col-3'
]

export default function FrontDoorCardsContainer(props) {
    return (
        <div className='cards'>
      <h1>{props.title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {props.placement == 'front-door' && frontDoorCards(props.data[0])}
          {props.placement == 'col-3' && col3Cards(props.data)}
        </div>
      </div>
    </div>
    )
}

function frontDoorCards(data) {
  return (
    <>
      <ul className='cards__items'>
        {Array(2).fill().map(number => 
          <FrontDoorCard
            src={data.src}
            text={data.text}
            label={data.label}
            path={data.path}
          />
        )}
      </ul>
      <ul className='cards__items'>
        {Array(3).fill().map(number => 
          <FrontDoorCard
            src={data.src}
            text={data.text}
            label={data.label}
            path={data.path}
          />
        )}    
      </ul>
    </>
  )
}

function col3Cards(data) {
  const dataChunks = chunks(data, 3);

  return (
    dataChunks.map(dataChunk => {
      return (
        <ul className='cards__items'>
          {dataChunk.map(dataChunkItem => 
            <FrontDoorCard
              src={dataChunkItem.src}
              text={dataChunkItem.text}
              label={dataChunkItem.label}
              path={dataChunkItem.path}
            />
          )}    
      </ul>
      )
    })
  )
}

const chunks = (a, size) =>
    Array.from(
        new Array(Math.ceil(a.length / size)),
        (_, i) => a.slice(i * size, i * size + size)
    );