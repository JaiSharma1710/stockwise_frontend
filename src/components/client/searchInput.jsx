"use client";
import axios from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { redirect } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { env_variables } from "@/config";

import "react-bootstrap-typeahead/css/Typeahead.css";

const SearchInput = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleSearchfocus() {
    onOpen();
  }

  return (
    <>
      <SeachModal {...{ isOpen, onOpen, onOpenChange }} />
      <div
        onClick={handleSearchfocus}
        className="mt-4 bg-white mx-4 rounded p-2 border md:mx-0 hover:cursor-text md:mt-8 md:w-[35rem]"
      >
        <p className="text-gray-400">Search for a Company</p>
      </div>
    </>
  );
};

export default SearchInput;

const SeachModal = ({ isOpen, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const baseUrl = env_variables.base_api_url;
    const {
      data: { data },
    } = await axios.get(`${baseUrl}/basic-info/search?searchTerm=${query}`);
    setOptions(data);
    setIsLoading(false);
  };

  const filterBy = () => true;

  const handleSelection = (selection) => {
    if (selection.length) {
      const { symbol } = selection?.[0];
      redirect(`company/${symbol}`);
    }
  };

  return (
    <Modal
      size="4xl"
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="h-96">
                <AsyncTypeahead
                  filterBy={filterBy}
                  autoFocus={true}
                  id="searchOptions"
                  className="global-search"
                  isLoading={isLoading}
                  labelKey="longName"
                  minLength={3}
                  size="lg"
                  onSearch={handleSearch}
                  options={options}
                  onChange={handleSelection}
                  placeholder="Search for a Company..."
                  renderMenuItemChildren={(option) => (
                    <div className="dropdown-item">
                      <p className="name">{option.longName}</p>
                      <p className="sector">{option.sector}</p>
                    </div>
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <p className="text-sm md:text-base text-center w-full font-light text-gray-400">
                Powered by StockWise | Press{" "}
                <span className="font-bold">ESC</span> to close
              </p>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
