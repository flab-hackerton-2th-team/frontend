import { useSpring, animated } from 'react-spring';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';

const AnimatedProgressBar = ({percent}: {percent: number }) => {
  const [isAnimateEnd, setIsAnimatedEnd] = useState(false);
  const props = useSpring({
    width: `${percent}%`,
    from: { width: '0%' },
    config: { duration: 500 },
    onRest: () => setIsAnimatedEnd(true),
  });

  return (
    <Box position="relative" width="100%" height="40px">
      <Box
        width="100%"
        height="100%"
        bg="gray.200"
        borderRadius="full"
        overflow="hidden"
        boxShadow="inset 0 2px 4px rgba(0,0,0,0.1)"
      >
        <animated.div
          style={{
            width: props.width,
            height: '100%',
            background: 'linear-gradient(90deg, #3182CE 0%, #63B3ED 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </Box>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%); opacity: ${isAnimateEnd ? 1 : 0}`}
        transition={`opacity 1s`}
        opacity={isAnimateEnd ? 1 : 0}
        fontSize="xl"
        fontWeight="bold"
        color="white"
      >
        {percent}
      </Box>
    </Box>
  );
};

export default AnimatedProgressBar;
