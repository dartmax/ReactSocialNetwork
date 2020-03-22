import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getBooksDetail, getBooksReview } from 'redux/actions';
import { BookDetailCard } from '../components';

class BookDetailsContainer extends Component {
    componentDidMount() {
        const { match, getBooksDetailDispatched, getBooksReviewDispatched } = this.props;
        getBooksDetailDispatched(match.params.id);
        getBooksReviewDispatched(match.params.id);
    }

    render() {
        const { bookDetail, bookReview, isLoading } = this.props;
        if (bookDetail.booksDetailItem && Object.keys(bookDetail.booksDetailItem).length !== 0 && !isLoading) {
            return (
                <Container>
                    <BookDetailCard
                        book={bookDetail.booksDetailItem}
                    />
                </Container>
            );
        }
        if (bookReview.reviewsCount && Object.keys(bookReview.reviewsCount).length !== 0 && !isLoad) {
            return (
                <Container>
                    <booksReviewsCount
                        booksReviews={bookReview.reviewsCount}
                    />
                </Container>
            );
        }
        return null;
    }
}

BookDetailsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    isLoad: PropTypes.func.isRequired,
    bookDetail: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        author: PropTypes.string,
    }).isRequired,
    bookReview: PropTypes.shape({
        reviewsCount: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
            reviews: PropTypes.string,
        }),
    }),

};

BookDetailsContainer.defaultProps = {
    match: {},
};

const mapStateToProps = state => ({
    bookDetail: state.selectedBook || {},
    isLoading: state.selectedBook.isLoading,
    isLoad: state.selectedReview.isLoad,
    bookReview: state.selectedReview || {},
});

export default connect(
    mapStateToProps, { getBooksDetailDispatched: getBooksDetail }, { getBooksReviewDispatched, getBooksReview },
)(BookDetailsContainer);





import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
    Col, Button, Form, FormGroup, Label, CustomInput, InputGroup, InputGroupAddon,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';


class CatalogueFormContainer extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        errorMessage: PropTypes.array.isRequired,
    };

    state = {
        genre: '',
        age_rating: '',
        language: '',
        radiobutton: false,
    };

    onChange = (e) => {
        this.setState({
            [e.target.type]: e.target.checked,
            [e.target.name]: e.target.value.trim(),
        });
    };

    isFormEmpty = ({
                       genre, age_rating, language, radiobutton,
                   }) => (
        !genre.length
        || !age_rating.length
        || !language.length
        || !radiobutton
    );

    onSubmit = (formData) => {
        const { dispatch } = this.props;
        dispatch(getBooks(formData));
    };

    render() {
        const { handleSubmit, errorMessage } = this.props;

        return (
            <Col className="login-container loginForm m-auto p-4" sm="12" xs="12" md="6" lg="4">
                <h3 className="mb-3">Search Book</h3>

                <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>

                    <SearchIcons />

                    <FormGroup className="mt-3">
                        <Label for="username">Genre</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text"><i className="far fa-user" /></span>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                component="input"
                                type="text"
                                autoFocus
                                genre="genre"
                                id="genre"
                                placeholder="Novel"
                                autoComplete="none"
                                onChange={this.onChange}
                            />
                        </InputGroup>
                        {errorMessage.username && (<div className="text-danger">{errorMessage.username}</div>)}
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Age rating</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text"><i className="far fa-envelope" /></span>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                component="input"
                                type="age_rating"
                                autoFocus
                                name="Age rating"
                                id="email"
                                placeholder="Age rating"
                                autoComplete="none"
                                onChange={this.onChange}
                            />
                        </InputGroup>
                        {errorMessage.email && (<div className="text-danger">{errorMessage.email}</div>)}
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">language</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text"><i className="fas fa-key" /></span>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                component="input"
                                type="language"
                                name="language"
                                id="language"
                                placeholder="language"
                                autoComplete="none"
                                onChange={this.onChange}
                            />
                        </InputGroup>
                        {errorMessage.password && (<div className="text-danger">{errorMessage.password}</div>)}
                    </FormGroup>

                    <FormGroup>
                        <CustomInput
                            tag={Field}
                            component="input"
                            name="Finished"
                            type="radiobutton"
                            id="finished"
                            label={[
                                'Agreed with ',
                                <Link key={0} to={frontendUrls.urlNotExist}>Finished</Link>,
                                ' and ',
                                <Link key={1} to={frontendUrls.urlNotExist}>Not Finished</Link>,
                            ]}
                            inline
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <Button
                        className="px-5 mb-4"
                        style={{ borderRadius: '2em' }}
                        color="primary"
                        disabled={this.isFormEmpty(this.state)}
                    >
                        Search
                    </Button>
                </Form>
            </Col>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
});

export default compose(
    connect(mapStateToProps, { getBooks }),
    reduxForm({
        form: 'registerForm',
    }),
)(CatalogueFormContainer);




