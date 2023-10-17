import React from 'react'
import { useParams } from 'react-router-dom'
import EditEventForm from './EditEventForm'
import { useSelector } from 'react-redux'
import { selectEventById } from '../eventsApiSlice'

const EditEvent = () => {

    const {eventId } = useParams()
    
    const event = useSelector(state => selectEventById(state, eventId))

    let content 

    if(event){
        content = (<EditEventForm event={event}/>)
    }

    else {
        content = <p>Event loading...</p>
    }

  return content
}

export default EditEvent