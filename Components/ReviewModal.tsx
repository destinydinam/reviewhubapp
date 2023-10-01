import { Review } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FcInfo } from "react-icons/fc";

type Props = {
  reviews: Review[];
};

const ReviewModal = ({ reviews }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ md: "2xl" });

  return (
    <>
      <button
        onClick={onOpen}
        className="border-2 rounded-lg border-yellow-600 bg-yellow-500 p-2 outline-none transition-all duration-200 ease-in-out hover:scale-105"
      >
        View Reviews
      </button>

      <Modal
        isOpen={isOpen}
        returnFocusOnClose={false}
        size={modalSize}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span className="mr-4 flex items-center gap-1 sm:gap-3">
              <p className="text-xs sm:text-sm">Product Reviews</p>
            </span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={1}>
            <div className="px-2 py-4">
              {reviews.map((review, i) => (
                <div key={i}>
                  <br />
                  <br />
                  <br />
                  <div className="border-2 border-black mt-10 px-2 py-4 space-y-3">
                    <strong>Review: {i + 1}</strong>
                    <h4>
                      <strong>Title: </strong>
                      {review.title}
                    </h4>
                    <p>
                      <strong>Date: </strong>
                      {review.date}
                    </p>
                    <p>
                      <strong>Rating: </strong>
                      {review.rating}
                    </p>
                    <p>
                      <strong>Review: </strong>
                      {review.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-transparent bg-[#83151d] px-4 py-2 text-white transition-all duration-500 hover:border-[#83151d] hover:bg-transparent hover:text-[#83151d]"
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
