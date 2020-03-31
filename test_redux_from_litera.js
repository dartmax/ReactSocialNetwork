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








import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Col, Button, Form, FormGroup, Label, CustomInput, InputGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAllGenre } from 'redux/actions';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

class CatalogueFilterContainer extends Component {
    state = {
        genre: [],
        age_rating: [],
        language: [],
        checkbox: true,
    };

    componentDidMount(): void {
        const { getAllGenreDispatched } = this.props;
        getAllGenreDispatched();
    }

    isFormEmpty = ({
                       genre, age_rating: ageRating, language, checkbox,
                   }) => (
        !genre.length
        || !ageRating.length
        || !language.length
        || !checkbox
    );


    onChange = (e) => {
        this.setState({
            [e.target.type]: e.target.checked,
            [e.target.name]: e.target.value.trim(),
        });
    };

    getGenreList = () => {
        const { allGenresList } = this.props;
        if (allGenresList.length > 0) {
            return allGenresList.map(e => e.name_en);
        }
        return [];
    };

    render() {
        const {
            handleSubmit, allGenresList,
        } = this.props;

        return (
            <Col className="search-container searchForm m-auto p-4" sm="12" xs="12">
                <Form onSubmit={handleSubmit(allGenresList)}>
                    <FormGroup>
                        <Label for="genre">Genre</Label>
                        <InputGroup>
                            <Field
                                className="genreMultiselect"
                                component={Multiselect}
                                multiple
                                defaultValue={[]}
                                data={this.getGenreList()}
                                name="Genre"
                                id="genre"
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="age_rating">Age rating</Label>
                        <InputGroup>
                            <Field
                                className="form-control"
                                component="select"
                                name="Age rating"
                                id="ageRating"
                                ageRating="ageRating"
                                onChange={this.onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="language">language</Label>
                        <InputGroup>
                            <Field
                                className="form-control"
                                component="select"
                                name="Language"
                                id="language"
                                language="language"
                                onChange={this.onChange}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <CustomInput
                            tag={Field}
                            component="input"
                            type="checkbox"
                            name="Finished"
                            id="finished"
                            label={[
                                <div>Finished</div>,
                            ]}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <Button
                        className="px-5 mb-4"
                        style={{ borderRadius: '2em' }}
                        color="primary"
                        disabled={this.isFormEmpty(this.state)}
                    >
                        Filter
                    </Button>
                </Form>
            </Col>
        );
    }
}

CatalogueFilterContainer.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getAllGenreDispatched: PropTypes.func.isRequired,
    allGenresList: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    allGenresList: state.genresReducer.allGenresList,
});

export default compose(
    connect(mapStateToProps, { getAllGenreDispatched: getAllGenre }),
    reduxForm({
        form: 'filter',
    }),
)(CatalogueFilterContainer);

