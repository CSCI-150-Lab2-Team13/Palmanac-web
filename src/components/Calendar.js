import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import CalendarEntry from './CalendarEntry';
import { firestore } from 'firebase';
import {rrulestr} from 'rrule';
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = { 
          events: [
          ],
          isEventModalOpen: false,
          isEditModalOpen: false,
          currentEvent: null,
          user: null,
        }
    }
    componentDidUpdate(prevProps, prevState) {
      // Typical usage (don't forget to compare props):
      if (this.props.user !== prevProps.user) {
        firestore().collection('users').doc(this.props.user).collection('events')
                .get()
                .then(snapshot =>{
                    snapshot.forEach(doc => {
                        if(doc.data().start && doc.data().end)
                        {
                          const {start, end, rrule, ...rest} = doc.data();
                          if (rrule){
                            var timeDiff = moment(end).diff(moment(start));
                            var rEvents = rrulestr(rrule).all();
                            rEvents.forEach(event => {
                              this.setState({
                                ...this.state,
                                events: [
                                  ...this.state.events,
                                  {
                                    start: moment(event).toDate(),
                                    end: moment(event).add(timeDiff).toDate(),
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
      }
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

      render() {
        return (
          <div className="rbc-calendar">
            <BigCalendar
              selectable
              localizer={localizer}
              events={this.state.events}
              defaultView={BigCalendar.Views.MONTH}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={this.toggleEventModal}
            />
            {this.state.isEventModalOpen ? <CalendarEntry open={this.state.isEventModalOpen} toggle={this.toggleEventModal} events={this.state.currentEvent}/>: null}
            </div>
        )
      }

}
export default Calendar;

