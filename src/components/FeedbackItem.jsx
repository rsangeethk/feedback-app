import { useContext } from 'react'
import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from "./shared/Card"
import PropTypes from 'prop-types'
import FeedbackContext from './context/FeedbackContext'

function FeedbackItem({item}) {
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext)
    return (
    <>
        <Card>
            <div className='num-display'>{item.rating}</div>
            <button className='close' onClick={() => deleteFeedback(item.id)}>
                <FaTimes color='purple'></FaTimes>
            </button>
            <button className='edit' onClick={() => editFeedback(item)}>
                <FaEdit color='purple'></FaEdit>
            </button>
            <div className='text-display'>{item.feedbackText}</div>
        </Card>
    </>
  )
}

FeedbackItem.propTypes = {
    item: PropTypes.arrayOf(
        PropTypes.shape( {
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            feedbackText: PropTypes.string.isRequired,
        }

        )
    )
}

export default FeedbackItem