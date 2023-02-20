import { Component } from "react";
import { BreedSelect } from './BreedSelect';
import { Layout } from './Layout';
import { fetchDogByBreed } from '../servises/api';
import { Dog } from './Dog';
import { DogSkeleton } from './DogSkeleton';
import { ErrorMessage } from './ErrorMessage';

export class App extends Component {
  state = {
    dog: null,
    isLoading: false,
    error: null,
  };

  fetchDog = async breedId => {
    try {
      this.setState({ isLoading: true, error: null });
      const dog = await fetchDogByBreed(breedId);
      this.setState({ dog });
    } catch (error) {
      this.setState({ error: 'У нас не получилось взять даннные о собачке, попробуйте еще разочек!' });
    } finally {
      this.setState({ isLoading: false });
  }
  };

  render() {
    const { dog, isLoading, error } = this.state;
    return (
      <Layout>
        <BreedSelect onSelect={this.fetchDog} />
        {isLoading && <DogSkeleton />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {dog && !isLoading && <Dog dog={dog} />}
      </Layout>
    );
  }
}
