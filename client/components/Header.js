import React from "react";
import {graphql} from "react-apollo";
import query from "../queries/CurrentUser";
import mutation from "../queries/logout";

import {Link} from "react-router";

class Header extends React.Component {

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{query}]
        })
    }

    renderButtons() {
        const {loading, user} = this.props.data;
        if (loading) {
            return (<div></div>);
        }

        if (user) {
            return (
                <div>
                    <li>Hello {this.props.data.user.email}</li>
                    <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
                </div>
            )
        } else {
            return (
                <div>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            )
        }

    }

    render() {
        console.log(this.props)

        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default  graphql(mutation)(
    graphql(query)(Header)
)