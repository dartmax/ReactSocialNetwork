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
import {
    FILTER_AGE_LIST, FILTER_LANG_LIST, LANG_BACKEND, AGE_BACKEND,
} from 'redux/constants';
import { Multiselect } from 'react-widgets';

class CatalogueFilterContainer extends Component {
    state = {
        activeGenre: [],
        ageRating: [],
        language: [],
        checkbox: false,
    };

    componentDidMount(): void {
        const { getAllGenreDispatched } = this.props;
        getAllGenreDispatched();
    }

    isFormEmpty = ({
                       activeGenre, ageRating, language,
                   }) => (
        !activeGenre
        || !ageRating.length
        || !language.length
    );

    onGenreChange = (e) => {
        this.setState({
            activeGenre: Array.isArray(e) ? [...e] : [],
        });
    };

    onAgeRatingChange = (e) => {
        this.setState({
            ageRating: e.target.value,
        });
    };

    onLanguageChange = (e) => {
        this.setState({
            language: e.target.value,
        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.type]: e.target.checked,
        });
    };

    getGenreList = () => {
        const { allGenresList } = this.props;
        if (allGenresList.length > 0) {
            return allGenresList.map(e => e.name_en);
        }
        return [];
    };


    handleSubmitClick = () => {
        const {
            activeGenre, ageRating, language, checkbox,
        } = this.state;
        const {
            allGenresList,
        } = this.props;
        let activeGenreId = '';
        if (allGenresList.length) {
            activeGenreId = allGenresList.find(genre => genre.name_en === activeGenre[0]).id;
        }
        window.location.href = `${window.location.origin}/books/?language=${LANG_BACKEND[language]}&age_rating=${AGE_BACKEND[ageRating]}&finished=${checkbox
            ? 'true'
            : 'false'}&genres=${activeGenre.length
            ? activeGenreId
            : ''}`;
    };


    render() {
        const {
            handleSubmit, allGenresList,
        } = this.props;
        const activeFilterAge = FILTER_AGE_LIST;
        const activeFilterLang = FILTER_LANG_LIST;
        return (
            <Col className="search-container searchForm m-auto p-4" sm="12" xs="12">
                <Form onSubmit={handleSubmit(allGenresList, activeFilterAge, activeFilterLang)}>
                    <FormGroup>
                        <Label for="genre">Genre</Label>
                        <InputGroup>
                            <Multiselect
                                className="w-100"
                                data={this.getGenreList()}
                                name="genre"
                                id="activeGenre"
                                onChange={this.onGenreChange}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="age_rating">Age rating</Label>
                        <InputGroup>
                            <Field
                                className="form-control"
                                component="select"
                                name="age_rating"
                                id="ageRating"
                                ageRating="ageRating"
                                onChange={this.onAgeRatingChange}
                            >
                                <option value="">Select a age rating...</option>
                                {activeFilterAge.map(valueAge => (
                                    <option value={valueAge} key={valueAge}>
                                        {valueAge}
                                    </option>
                                ))}
                            </Field>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="language">language</Label>
                        <InputGroup>
                            <Field
                                className="form-control"
                                component="select"
                                name="language"
                                id="language"
                                language="language"
                                onChange={this.onLanguageChange}
                            >
                                <option value="">Select a language...</option>
                                {activeFilterLang.map(valueLang => (
                                    <option value={valueLang} key={valueLang}>
                                        {valueLang}
                                    </option>
                                ))}
                            </Field>
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
                        onClick={this.handleSubmitClick}
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
    allGenresList: state.selectedFilter.allGenresList,
    genresFilter: state.selectedFilter.genresFilter,
});

export default compose(
    connect(mapStateToProps, { getAllGenreDispatched: getAllGenre }),
    reduxForm({
        form: 'filter',
    }),
)(CatalogueFilterContainer);
