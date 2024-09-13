"use client";

import { useRef, useEffect, useState } from "react";
import { Box, CircularProgress, CircularProgressLabel, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Progress } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import InterviewerProfile from "./_components/InterviewerProfile";
import { selectChat } from "@/store/redux/features/chat/selector";
import { initializeChatState } from "@/store/redux/features/chat/slice";
import AnimatedProgressBar from "./_components/AnimatedProgressBar";

const InterviewerProfileWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Flex
        height={"max-content"}
        paddingY={"40px"}
        borderBottom={"1px solid"}
        borderColor={"gray.100"}
      >
        {children}
      </Flex>
    </>
  );
};

export default function Page() {
  const chatContents = useSelector(selectChat);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const dispatch = useDispatch();
  // const { user, isLoggedIn, setUser, clearUser } = useUserStore();

  useEffect(() => {
    return () => {
      dispatch(initializeChatState(null));
    };
  }, []);

  return (
    <Box
      width={"100%"}
      maxWidth={726}
      flex={1}
      display="flex"
      flexDirection={"column"}
    >
      <InterviewerProfileWrapper>
        <InterviewerProfile />
      </InterviewerProfileWrapper>
      <Flex direction="column" alignItems="center" width="100%" mt={8}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="40x"
          mb={6}
        >
          <div style={{ 
            fontSize: "4rem", 
            fontWeight: "medium", 
            color: "#1A202C", // A very dark blue-black color
            textShadow: "1px 2px 2px #1A202C" // Subtle blue shadow for a blue feeling
          }}>
            Total Score
          </div>

          <Box position="relative" width="80%" height="40px">
            <AnimatedProgressBar percent={85}/>
          </Box>
        </Box>
        
        <Flex justifyContent="center" flexWrap="wrap" gap={4}>
          {[
            { title: "Communication", score: 18 },
            { title: "Technical Skills", score: 17 },
            { title: "Problem Solving", score: 16 },
            { title: "Teamwork", score: 17 },
            { title: "Creativity", score: 17 },
          ].map((item, index) => (
            <Box
              key={index}
              width="200px"
              height="150px"
              borderWidth={1}
              borderRadius="lg"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => setSelectedCard(item.title)}
              _hover={{ boxShadow: "0 0 10px 0 rgba(66, 153, 225, 0.5)" }}
              bg="white"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              transition="all 0.3s"
              boxShadow="0 0 5px 0 rgba(66, 153, 225, 0.3)"
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Box
                fontSize="lg"
                fontWeight="semibold"
                mb={2}
                color="gray.600"
              >
                {item.title}
              </Box>
              <Box
                fontSize="3xl"
                fontWeight="bold"
                borderRadius="full"
                width="80px"
                height="80px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {item.score}
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Modal component */}
      <Modal isOpen={!!selectedCard} onClose={() => setSelectedCard(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCard}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Here's the reason for the {selectedCard} score...</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
