import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";


// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { store } from "../../store.js";
import { onDrop } from './functions/onDrop.js'

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const userInfo = useContext(store)

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const { tasksIndexes, tasks, rtlActive } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive
  });

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.tableHeadRow}>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
        <TableBody onDragOver={(e) => {onDragOver(e)}}
                  onDrop={(e) => {onDrop(e, props.categoryIndex, userInfo)}}>
        {tasks.map((value) => {
            /* Renders a row with the important information 
            for each transaction. This exists in both 
            sorted and unhandled tables.*/
            return (
              <TableRow>
                <TableCell>{value.id}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.date}</TableCell>
                <TableCell>{value.category}</TableCell>
                <TableCell>{value.amt}</TableCell>
              </TableRow>
            );
        })}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};
