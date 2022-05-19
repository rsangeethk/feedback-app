import { useState, useContext, useEffect } from "react";
import FeedbackContext from "./context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";


function FeedbackForm() {
    const [feedbackText, setFeedbackText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [rating, setRating] = useState(10)
    const [message, setMessage] = useState('')

    const { addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setFeedbackText(feedbackEdit.item.feedbackText)
            setRating(feedbackEdit.item.feedbackText)
        }
    }, [feedbackEdit])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(feedbackText.trim().length >= 10) {
            const newFeedback = {
                feedbackText,
                rating
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }
            else {
                addFeedback(newFeedback)
            }
            
            setFeedbackText('')
        }
    }

    const handleTextChange = (e) => {
        if(feedbackText === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(feedbackText !== '' && feedbackText.trim().length < 10) {
            setMessage('Text must be atleast 10 characters')
            setBtnDisabled(true)
        }
        else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setFeedbackText(e.target.value)
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>Rate our service and provided your reviews for us to improve</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className='input-group'>
                <input type='text' onChange={handleTextChange} value={feedbackText}></input>
                <Button type="submit" isDisabled={btnDisabled}>Send</Button> 
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm