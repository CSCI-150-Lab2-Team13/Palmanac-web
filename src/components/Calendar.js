import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import CalendarEntry from './CalendarEntry';
import CalendarEdit from './CalendarEdit';
import { firestore } from 'firebase';
import firebase from 'firebase/app';
import firebaseAPI from '../firebase/firestoreAPI';
import {rrulestr} from 'rrule';
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = { 
          events: [
          ],
          selectedEvent: null,
          isEventModalOpen: false,
          isEditModalOpen: false,
          currentEvent: null,
          fetched: false,
        }
    }

    getEvents() {
      console.log('getting events')
      firestore().collection('users').doc(firebase.auth().currentUser.displayName).collection('events')
      .get()
      .then(snapshot =>{
          snapshot.forEach(doc => {
              console.log(doc.id)
              if((doc.data().start || doc.data().startTime) && (doc.data().end || doc.data().endTime))
              {
                const start = doc.data().startTime ? doc.data().startTime : doc.data().start;
                const end = doc.data().endTime ? doc.data().endTime : doc.data().end;
                const {rruleString, ...rest} = doc.data();
                if (rruleString){
                  var timeDiff = moment(end).diff(moment(start));
                  var rEvents = rrulestr(rruleString).all();
                  rEvents.forEach(event => {
                    this.setState({
                      ...this.state,
                      events: [
                        ...this.state.events,
                        {
                          start: moment(event).toDate(),
                          end: moment(event).add(timeDiff).toDate(),
                          id: doc.id,
                          rruleString: rruleString,
                          ...rest
                        }
                      ]
                    })
                  })
                } else {
                    this.setState({
                    ...this.state,
                    events: [
                      ...this.state.events,
                      {
                        start: moment(start).toDate(),
                        end: moment(end).toDate() ,
                        id: doc.id,
                        ...rest
                      }
                    ]
                  })
              }
              }               
          });
      })
      .catch(err => {
          console.log('Error getting docs', err);
      });
      this.setState({fetched: true})
    }
    toggleEventModal = event => {
        if (!this.state.isEditModalOpen) {
          this.setState({
            currentEvent: event,
            isEventModalOpen: !this.state.isEventModalOpen,
          });
        }
      };
    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
          this.setState({
            events: [
              ...this.state.events,
              {
                start,
                end,
                title,
              },
            ],
          })
      }

      refetch = () => {
        this.setState({
          ...this.state,
          events: [],
          fetched: false
        })
      }

      handleSelectedEvent = event => {
        this.setState({
          ...this.state,
          selectedEvent: event,
          isEditModalOpen: !this.state.isEditModalOpen
        })
      }

      render() {
        if(this.props.user && !this.state.fetched){
          this.getEvents()
        }
        return (
          <div className="rbc-calendar">
            <BigCalendar
              selectable
              localizer={localizer}
              events={this.state.events}
              defaultView={BigCalendar.Views.MONTH}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={this.handleSelectedEvent}
              onSelectSlot={this.toggleEventModal}
            />
            {this.state.isEventModalOpen ? <CalendarEntry open={this.state.isEventModalOpen} toggle={this.toggleEventModal} events={this.state.currentEvent} update={this.refetch}/>: null}
            {this.state.isEditModalOpen ? <CalendarEdit open={this.state.isEditModalOpen} toggle={this.handleSelectedEvent} event={this.state.selectedEvent} update={this.refetch}/>: null}
            </div>
        )
      }

}
export default Calendar;

