import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { onDropFunction } from "./onDrop.js";

import { store } from "../../store.js";


const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const onDragStart = (ev, id) => {
    // Saves the data in this component. We will
    // grab it from dataTransfer when we drop it
    ev.dataTransfer.setData('text/plain',id);
  }
  const onDragOver = (e) => {
    e.preventDefault();
  }

  const userInfo = useContext(store);

  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody
          onDragOver={(e) => {onDragOver(e)}}
          onDrop={(e) => {onDropFunction(e, props.categoryIndex, userInfo)}}
        >
          {tableData.map((prop, key) => {
            return (
              // I can just say draggable and I can drag it.
              // Facebook is out their tree for this one
              <TableRow key={key} draggable
              onDragStart={(e) => onDragStart(e, prop)}
              className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
