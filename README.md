# React/Redux device health reports

Interested in learning [Redux](https://www.udemy.com/react-redux/)?

### Getting Started

```
> npm install
> npm start
```

### Getting Started

Application takes a csv file(s) formatted with the following columns: "timestamp", "id", "type", "status" via upload and takes the data to produce two types of reports.

The first report reports on the top 10 most mentioned device IDs for a particular day (selectable via a dropdown generated from timestamp data) and a percentage comparison with respect to the day of the previous week.

The second report produces a table of up to 30 of the last reported days and returns the count of unique device IDs for each day. This can be further filtered with for types and statuses (also selectable via a dropdown generated for csv data).