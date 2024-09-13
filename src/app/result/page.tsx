"use client";

import { useRef, useEffect, useState } from "react";
import { Box, CircularProgress, CircularProgressLabel, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Progress } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import InterviewerProfile from "./_components/InterviewerProfile";
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
          gap={"10px"}
          mb={6}
        >
          <div style={{ 
            fontSize: "2.5rem", 
            fontWeight: "medium", 
            color: "#1A202C", // A very dark blue-black color
            textShadow: "1px 2px 2px #1A202C" // Subtle blue shadow for a blue feeling
          }}>
            엘론 머스크의 평가
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
              width="100%"
              borderWidth={1}
              borderRadius="lg"
              p={4}
              cursor="pointer"
              onClick={() => setSelectedCard(item.title)}
              _hover={{ boxShadow: "0 0 10px 0 rgba(66, 153, 225, 0.5)" }}
              bg="white"
              display="flex"
              alignItems="center"
              transition="all 0.3s"
              boxShadow="0 0 5px 0 rgba(66, 153, 225, 0.3)"
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Flex alignItems="center" width="100%">
                <Box
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  borderRadius="full"
                  width={{ base: "50px", md: "60px" }}
                  height={{ base: "50px", md: "60px" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  background="linear-gradient(135deg, #6B46C1, #4299E1)"
                  color="white"
                  mr={{ base: 3, md: 4 }}
                  boxShadow="0 4px 6px rgba(107, 70, 193, 0.3)"
                >
                  {item.score}
                </Box>
                <Box flex={1}>
                  <Box
                    fontSize="lg"
                    fontWeight="semibold"
                    color="gray.700"
                    mb={1}
                  >
                    {item.title}
                  </Box>
                  <Box fontSize="sm" color="gray.500">
                    {`Description for ${item.title.toLowerCase()} goes here.`}
                  </Box>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
