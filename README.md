## Timeline assignment debrief

I chose to do a vertical timeline for my assignment. Currently it is in a read-only form, however I provided a mock-up related to the added functionality prompts (web-timeline-single-event.pdf)  


* __How long you spent on the assignment:__ around 5 hours, this was my first React project so a chunk of that was getting familiar with the syntax
* __What you like about your implementation:__ I like the way it looks. The project has minimal dependencies – React and date-fns (a library that is smaller than moment.js). The use of css grid is fun as well, in my opinion.
* __What you would change if you were going to do it again.__ a few things, namely: 
- device / browser compatibility 
- stacking the events (I ran out of time to implement this feature now) 
- calculating the actual size of a rendered string rather than doing it based on character count
- create a dynamic naming convention for the css grid spaces (e.g. specifying the last column)
- interactivity
- ability to choose between horizontal and vertical layouts
- reduce size – this folder is 220MB
* __How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.:__ I really liked the examples I saw here: https://www.awwwards.com/creative-calendar-designs.html. The vertical design is something I came up after mapping the data in an Google Sheet. Given the data, I made the assumption that this is a project with several deliverables. The decisions that follow are all tied to that assumption:
- An item has a gradient if it has progress tracking 
- Clicking anywhere on the item would enable the user to edit the data
- The color of the item is determined by the "type" of task at hand (currently derived from the name). 
- The gradient is also a way of signifying the % of the task that's complete (e.g. grey for 100% complete) 
- The choice of css grid was deliberate. I wanted to ability to index the events in 2D space. After seeing a couple of calendar examples using flexbox, SVG and HTML table, I thought the grid would be most intuitive for my use case.
A couple of notes on the mock-up (web-timeline-single-event.pdf):
- Its purpose is to demonstrate functionality rather than be a literal mock-up
- This view provides a means of editing the item title/dates/description/progress information
- It reinforces the gradient functionality

* __How you would test this if you had more time.__ with more/different data and users!