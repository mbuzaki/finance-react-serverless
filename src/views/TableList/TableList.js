import React, { useState, useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { bugs, website, server } from "variables/general.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Tasks from "components/Tasks/Tasks.js";

import { store } from '../../store.js'

import { API } from 'aws-amplify';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {

  function addCategory() {
    // Adds new category to existing list in DynamoDb
    // @trigger: Test Add Category button

    /* All categories will be held in state because they will be
    used to render data. When a new category is made, append it to
    the array and trigger the API when the user exits the view. We will
    use a React lifecycle method most likely. This will keep us from 
    invoking the lambda like 8 consecutive times when they add several
    categories in one visit. When a category is made, the function (as
    of right now) also adds a blank array meant to be that respective
    categories keywords. */

    const categories = ['restaurants', 'travel', 'fun', 'groceries']
    const kw = [['Starbucks', 'McDonald\'s', 'KFC'],
                [ 'Uber', 'Sparkfun'],
                ['United Airlines', 'Tectra Inc', 'Touchstone', 'Madison Bicycle Shop'],
                ['Tectra Inc']
               ]
    var data = {
      body:{
        categories: categories,
        kw: kw
      }
    }
    // All test data

    userInfo.updateCategories(categories);
    userInfo.updateKeywords(kw);
    var newSorted = userInfo.sortedTransactions;
    newSorted.push([])
    userInfo.receiveSortedArray(newSorted)

    API.post('categoriesApi', '/addCategory', data).then(res => {
      console.log(res);
    })
  }

  const classes = useStyles();
  const userInfo = useContext(store)

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <button onClick={addCategory}>Add Category</button>
        <CustomTabs
              title="Sorted Transactions"
              headerColor="primary"
              tabs={userInfo.categories.map(value => {
                /* Renders a tab for each category that
                exists in the categories global state array.
                For each of those category tabs, it grabs the 
                sorted transactions from the 2D array in the
                same respective array spot. */
                var index = userInfo.categories.indexOf(value)
                var categoryTrx = userInfo.sortedTransactions[index]
                return(
                  {tabName: value,
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      tasks={categoryTrx}
                    />
                  )}
                )
              })}
            />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Unhandled Transations</h4>
            <p className={classes.cardCategoryWhite}>
              Manually sort now, automatically sort in the future
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Date", "Category", "Amount"]}
              tableData={userInfo.transactions.filter(item =>
                item.category === 'unhandled').map((trx) => {
                    return [trx.name, trx.date, trx.category, trx.amt]
                    // Wow this two-liner is so sick
              })}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
