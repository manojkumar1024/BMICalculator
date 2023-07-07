import {
  Box,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Icon,
  Container,
  Heading,
  Highlight,
  Button,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Alert,
  AlertIcon,
  VisuallyHidden,
  Image,
  useToast,
  FormControl,
  FormLabel,
  HStack,
  Center,
} from "@chakra-ui/react";

import { React, useState, useContext } from "react";
import { BiUser, BiCategoryAlt } from "react-icons/bi";
import { TbPrompt, TbKeyboardShow, TbArrowAutofitHeight } from "react-icons/tb";
import { BsBodyText } from "react-icons/bs";

import { HiOutlinePhone } from "react-icons/hi";

import { AiOutlineTag } from "react-icons/ai";
import { FaLessThanEqual, FaRandom } from "react-icons/fa";

import { GiWeight } from "react-icons/gi";



function PostCreate() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bmi, setBMI] = useState("");
  const [category, setCategory] = useState("");
  const {
    isOpen: isChooseOpen,
    onOpen: ChooseOpen,
    onClose: ChooseOnClose,
  } = useDisclosure();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toasterr = useToast();
  const toastsuccess = useToast();

  function handleError(errorMessage) {
    toasterr({
      title: "Error",
      description: errorMessage.toString(),
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  function handleSuccess(Message) {
    toasterr({
      title: "",
      description: Message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const bmiCategory = getBMICategory(bmiValue);
    const convertred = bmiValue.toFixed(2);
    setBMI(convertred);
    setCategory(bmiCategory);

    if (
      name == "" ||
      age == "" ||
      weight == "" ||
      height == "" ||
      phoneNumber == ""
    ) {
      handleError("Please Fill the Field First");
    } else {
      ChooseOpen();
    }
  };

  const handlesubmitCheck = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        age,
        weight,
        height,
        phoneNumber,
        bmi,
        category,
      };

      fetch("http://localhost:8000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      handleSuccess("Stored!!!");
      ChooseOnClose();
    } catch (error) {
      console.log(error.message);
      handleError(error.message);
    }
  };

  return (
    <>
      <Container maxW={"2xl"}>
        <Box className=" mt-20 md:mt-15" p="6" rounded="lg" color={"rgb(0,0,102)"} >
          <Center>
          <Heading lineHeight="tall">
          
          BMI CALCULATOR
      
      </Heading>
          </Center>
         
          <Stack spacing={4} mt={10}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={BiUser} color="red"/>}
              />
              <Input
                type="text"
                placeholder="Name"

                value={name}
                color={"blue"}
                onChange={(e) => setName(e.target.value)}
                
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={BiCategoryAlt} color="red" />}
              />

              <Input
             type="number"
                placeholder="Age"
                
                value={age}
                color={"blue"}
                onChange={(e) => setAge(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.100"
                fontSize="1.2em"
                children={<Icon as={HiOutlinePhone} color="red"  />}
              />
              <Input
                maxLength={13}
                type="number"
                placeholder="Phone No"
                value={phoneNumber}
                color={"blue"}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            <Box width={"full"}>
                <FormControl id="">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="green"
                      fontSize="1.2em"
                      children={
                        <Icon as={TbArrowAutofitHeight} color="red" />
                      }
                    />
                    <Input
                      width={"full"}
                      type="number"
                      placeholder="Height"
                      value={height}
                      color={"blue"}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Box>
            <Box width={"full"}>
                <FormControl id="" isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<Icon as={GiWeight} color="red" />}
                    />
                    <Input
                      width={"full"}
                      type="number"
                      placeholder="Weight"
                      value={weight}
                      color={"blue"}
                      onChange={(e) => setWeight(e.target.value) }
                      
                    />
                  </InputGroup>
                </FormControl>
              </Box>
              
{ /*
            <HStack>
            
            </HStack> */}

            <Button  onClick={calculateBMI} colorScheme="teal" variant="solid" >
              SUBMIT
            </Button>
            <Modal
            
              closeOnOverlayClick={false}
              isOpen={isChooseOpen}
              onClose={ChooseOnClose}
              
            >
              <ModalOverlay />
              <ModalContent>
                
                <ModalHeader  color={"red"} >BMI CALCULATION</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                  >
                    <Card>
                      {/* <CardHeader>
                        <Heading size="md">BMI CALCULATION</Heading>
                      </CardHeader> */}
                      <CardBody className="text-center" color={"green"}>
                        <Text>BMI Value : {parseFloat(bmi)}</Text>
                        <Text>Category : {category}</Text>
                        <Container mt = {5}>
                          <Center>
                            <Image width={130} height={250} borderRadius={10} src={require(`../../img/${category?category:"Obese"}.png`)}/>
                          </Center>
                        </Container>
                      </CardBody>
                      <CardFooter>
                        <Button width={"full"} onClick={handlesubmitCheck} color={"white"} >
                          
                          Store
                        </Button>
                      </CardFooter>
                    </Card>
                  </SimpleGrid>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default PostCreate;
