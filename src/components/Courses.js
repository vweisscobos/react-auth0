import React from 'react';

class Courses extends React.Component {

    constructor() {
        super();

        this.state = {
            courses: [],
            message: ''
        }
    }

    componentDidMount() {
        fetch('/courses', {
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}`}
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.')
        })
        .then(response => {
            this.setState({ courses: response.courses })
        })
        .catch(error => this.setState({ message: error.message }));
    }
    
    render() {
        const { courses } = this.state; 

        return <ul>
            {
                courses.map(course => {
                    return <li key={course.id}>{course.title}</li>
                })
            }
        </ul>
    }
}

export default Courses; 