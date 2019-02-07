import React from "react";
import dateFns from "date-fns";
import timelineItems from "./timelineItems";

//get timeline boundaries
function findMinMax(arr) {
  let min = arr[0].start,
    max = arr[0].end;

  for (let i = 0; i < arr.length; i++) {
    let v = arr[i].end;
    min = v < min ? v : min;
    max = v > max ? v : max;
  }

  return [min, max];
}

// sort events by start date
function sortbyStart(a, b) {
  return a.start - b.start;
}

class Calendar extends React.Component {

  getEvents() {
    //add a few entries to the existing data
    for (let j = 0; j < timelineItems.length; j++) {
      var item = timelineItems[j];
      item.start = dateFns.parse(item.start);
      item.end = dateFns.parse(item.end);
      item.startIndex = dateFns.getDayOfYear(item.start);
      item.endIndex = dateFns.getDayOfYear(item.end);
      item.length = dateFns.differenceInDays(item.end, item.start);
    }

    // cast sorted to new array
    var events = timelineItems.sort(sortbyStart);
    return events;
  }

  eventsStuff = this.getEvents();
  startEnd = findMinMax(this.eventsStuff);
  dayTotal = dateFns.differenceInDays(this.startEnd[1], this.startEnd[0]);


  renderMonths() {
    const dateFormat = "MMMM";
    const months = [];
    const firstDate = this.startEnd[0];
    const monthDiff = dateFns.differenceInMonths(
      dateFns.endOfMonth(this.startEnd[1]),
      this.startEnd[0]
    );

    //will likely always have a first month
    months.push(
      <div
        className = "month"
        key = "M-0"
        style={{
          gridRowStart: 1,
          gridRowEnd: dateFns.getDayOfYear(
            dateFns.min(this.startEnd[1], dateFns.endOfMonth(this.startEnd[0]))
          ) + 1
        }}
      >
        <span>{dateFns.format(this.startEnd[0], dateFormat)}</span>
      </div>
    );

    //for months following do this, until we run out of months
    if (monthDiff > 0) {
      for (let i = 0; i < monthDiff; i++) {
        const firstDateofNext = dateFns.startOfMonth(
          dateFns.addMonths(firstDate, i + 1)
        );

        months.push(
          <div
            className= "month"
            key = {`M-${i+1}`}  
            style={{
              gridRowStart: dateFns.getDayOfYear(firstDateofNext), //figure out where the months start and end
              gridRowEnd: dateFns.getDayOfYear(
                dateFns.min(
                  this.startEnd[1],
                  dateFns.endOfMonth(firstDateofNext)
                )
              )
            }}
          >
            <span>{dateFns.format(firstDateofNext, dateFormat)}</span>
          </div>
        );
      }
    }

    return months;
  }

  renderDays(dateFormat, dateClass) { //have the option of rendering dates according to a specified format selecting the right class
    const days = [];
    for (let k = 0; k < this.dayTotal; k++) {
      days.push(
        <div className={dateFns.isWeekend(dateFns.addDays(this.startEnd[0], k)) ? `weekend ${dateClass}` : `${dateClass}` } style={{ gridRow: k + 1 }}
        key = {`dateClass-${k}`}
        >
          <span>
            {
              dateFns.format(dateFns.addDays(this.startEnd[0], k), dateFormat)
            }
          </span>
        </div>
      );
    }
    return days;
  }

  renderEvents() {
    //add events given criteria
    const events = [];

    for (let k = 0; k < this.eventsStuff.length; k++) {
      const evClass = this.eventsStuff[k].name.split(" ")[0].toLowerCase();

      events.push(
        <div
          className= {`event ${evClass}`}
          key = {`event-${k}`}
          style={{
            gridColumn: k + 3,
            gridRowStart: this.eventsStuff[k].startIndex,
            gridRowEnd: this.eventsStuff[k].endIndex
          }}
        >
        
        <span className= 'title' >
              {
                this.eventsStuff[k].name.substring(0,7) + "..."
            }
            
          </span>
        <span className= 'description' >
              {
                this.eventsStuff[k].length > 3 ? this.eventsStuff[k].name  : " " 
            }
            
          </span>


        </div>
      );
    }
    return events;
  }

  render() {
    return (
      <div className="calendar">
        {this.renderMonths()}
        {this.renderDays('ddd - D', 'day')}
        {this.renderEvents()}
        {this.renderDays('D-ddd', 'dates')}
      </div>
    );
  }
}

export default Calendar;