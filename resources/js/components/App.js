import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";
import Nav from "./Nav/Nav";
import Signup from "./signUp/Signup";
import Signin from "./SignIn/Signin";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";



class App extends Component {
  state = {
      customers: [],
      loader: false,
      customer: {},
      url: 'http://localhost/laravel-rest-api/public/api/customers'
  };
   // axios
  getCustomers = async () => {
    this.setState({ loader: true });
    const customers = await axios.get(this.state.url);
    this.setState({ customers: customers.data, loader: false });

  };

  // pour delete
  deleteCustomer = async id => {
    this.setState({ loader: true });
    await axios.delete(`${this.state.url}/${id}`);

    this.getCustomers();
    };
// pour creation
    createCustomer = async data =>{
      this.setState({ loader: true });

      await axios
      .post(this.state.url, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        tache: data.tache,
        detailtache: data.detailtache,
        statut: data.statut
      });
      this.getCustomers();
    };

    editCustomer =  async (data) =>{
       // clear customer obj
    this.setState({ customer: {}, loader: true });

    await axios
      .put(`${this.state.url}/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        tache: data.tache,
        detailtache: data.detailtache,
        statut: data.statut

      });

    this.getCustomers();
  };




  componentDidMount() {
    this.getCustomers();
  }
// pour delete
  onDelete = (id) => {
      //console.log("app ", id);
      this.deleteCustomer(id);

  };

  // pour edit
  onEdit = data => {
  //console.log("app ", data);
  this.setState({ customer: data });

  };

  onFormSubmit = (data) => {
     //console.log("app ", data);
     if (data.isEdit) {
      // if is edit true
      this.editCustomer(data);
    } else {
      // if is edit false
      this.createCustomer(data);
    }

  };



    render() {
        let navLink = (
            <div className="Tab">
                <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
                   Login
                </NavLink>
                <NavLink exact to="/" activeClassName="activeLink" className="signUp">
                   Register
                </NavLink>
            </div>
        );
        const login = localStorage.getItem("isLoggedIn");


        return (
        <div>
            <div className="App">
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            To Do list
                        </a>
                    </div>

                </div>
                {login ? (
                    <Router>
                        <Route exact path="/" component={Signup}></Route>
                        <Route path="/sign-in" component={Signin}></Route>
                        <Route path="/home" component={Home}></Route>
                    </Router>
                ) : (
                    <Router>
                        {navLink}
                        <Route exact path="/" component={Signup}></Route>
                        <Route path="/sign-in" component={Signin}></Route>
                        <Route path="/home" component={Home}></Route>
                    </Router>
                )}

            </div>
            <div  className="ui main container">
            <MyForm
            onFormSubmit={this.onFormSubmit}
             customer={this.state.customer}
            />
            {this.state.loader ? <Loader /> : ""}


            <CustomerList
            customers={this.state.customers}  onDelete={this.onDelete}
            onEdit={this.onEdit}
            />

            </div>

        </div>
        );
    }

}


export default App;
