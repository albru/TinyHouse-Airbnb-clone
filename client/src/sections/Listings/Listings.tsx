import React from "react";
import { server, useQuery } from "../../lib/api";
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
  const { data } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
  };
  const listingsList = data?.listings.map((listing) => (
    <>
      <li key={listing.id}>{listing.title}</li>
      <button onClick={() => deleteListing(listing.id)}>Delete Listing!</button>
    </>
  ));

  return (
    <div>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
    </div>
  );
};
