import React, { Component } from "react";


class Customer extends Component {
    onDelete = () => {
       //console.log("customer on delete");
       this.props.onDelete(this.props.customer.id);

      };

      onEdit = () => {
        // console.log("customer on Edit");
        this.props.onEdit(this.props.customer);
      };

    render() {
        // declarer les variables
        const { id, first_name, last_name, email, tache, detailtache, statut } = this.props.customer;
        return (
            <tr>
            <td style={{ textAlign: "center" }}>{id}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{email}</td>
            <td>{`${tache}`}</td>
            <td>{`${detailtache}`}</td>
            <td>{`${statut}`}</td>
            <td>
                <button className="mini ui blue button"  onClick={this.onEdit}>Edit</button>
                <button className="mini ui red button" onClick={this.onDelete}> Delete
          </button>
            </td>

            </tr>


        );



}

}
export default Customer;
