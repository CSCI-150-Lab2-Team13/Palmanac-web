import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import EventForm from './EventForm';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor(...args) {
      super(...args)
  
      this.state = { 
          events,
          isEventModalOpen: false,
          isEditModalOpen: false,
          currentEvent: null,
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
       const events = this.state.currentEvent;
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
            {this.state.isEventModalOpen ? <EventForm open={this.state.isEventModalOpen} toggle={this.toggleEventModal} events={this.state.currentEvent}/>: null}
            </div>
        )
      }

}
export default Calendar;

