import React from "react";
import { useQuery, useMutation } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };
  const listingsList = data?.listings.map((listing, i) => (
    <li key={i}>
      {listing.title}
      <button onClick={() => handleDeleteListing(listing.id)}>
        Delete Listing!
      </button>
    </li>
  ));

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Deletion failed...</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
