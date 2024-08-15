import { AntDesign } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactsPicker from "../components/contacts/ContactsPicker";
import EmergencyContactItem from "../components/contacts/EmergencyContactItem";
import { db } from "../firebase/firebase";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { color } from "react-native-reanimated";
const { height, width } = Dimensions.get("screen");


// const BEARER_TOKEN_GEMINI = process.env.REACT_APP_GEMINI_KEY;
// const BEARER_TOKEN_GEMINI_2 = process.env.REACT_APP_GEMINI_KEY_2;

// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
// let imageFile = new File([""], "image.png", { type: "image/png" });

// // Set up your Gemini configuration
// const genAI = new GoogleGenerativeAI(BEARER_TOKEN_GEMINI);
// const genAI2 = new GoogleGenerativeAI(BEARER_TOKEN_GEMINI_2);

// const config = [
//   {
//     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//     threshold: HarmBlockThreshold.BLOCK_NONE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_NONE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//     threshold: HarmBlockThreshold.BLOCK_NONE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//     threshold: HarmBlockThreshold.BLOCK_NONE,
//   }
// ]

// // The Gemini 1.5 models are versatile and work with most use cases
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safety_settings: config });
// const visionModel = genAI2.getGenerativeModel({ model: "gemini-1.5-flash-latest", safety_settings: config });


// async function queryHuggingFaceModel() {
//   setIsLoading(true); 

//   try {

//     if (selectedImage instanceof File) {
//       imageFile = selectedImage;
//     }

//     const visionPrompt = "Identify all the items that are in the picture. Then, provide a brief description of the items in the image"

//     const image = await fileToGenerativePart(imageFile);

//     const result = await visionModel.generateContent([
//       visionPrompt,
//       image
//     ]);

//     const visionResponse = await result.response;
//     const imageCaption = visionResponse.text();
//     // console.log(imageCaption)

//     const prompt = inputsForLLM.inputImage.concat(`$${imageCaption}`);

//     const resultGemini = await model.generateContent(prompt);
//     const responseGemini = await resultGemini.response;
//     const text = responseGemini.text().replace(/\*/g, ''); 

//     // Update the chat messages with the image and the text response
//     //let imageUrl = selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage;
//     setChatMessages(prevMessages => [
//       ...prevMessages,
//       { userId: 2, type: 'text', message: text }
//     ]);

//   } catch (error) {
//     console.error("Error during AI model queries:", error);
//     setChatMessages(prevMessages => [
//       ...prevMessages,
//       { userId: 2, type: 'text', message: "There was an error processing your request. Please try again." }
//     ]);
//   } finally {
//     setIsLoading(false); 
//   }
// }

const MedicationItem = ({ iconType, medicationName, dosage, timing }) => {
  const iconMap = {
    triangle: 'triangle',
    circle: 'ellipse',
    star: 'star'
  };

  const getIconColor = (shape) => {
    switch(shape) {
      case 'triangle':
        return 'red'; 
      case 'circle':
        return 'yellow'; 
      case 'star':
        return 'green';
      default:
        return 'black';
    }
  };
  
  return (
    <View style={styles.medicationItem}>
      <MaterialCommunityIcons name={iconMap[iconType]} size={30} color={getIconColor(iconType)} style={styles.icon} />
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medicationName}</Text>
        <Text>{dosage}</Text>
        <Text>{timing}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const ContactsScreen = () => {

  // const currentUser = 1;
  // const [message, setMessage] = useState<string>("");
  // const { selectedImage, setSelectedImage, chatMessages, setChatMessages, prevSelectedImageRef } = useImageContext();
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const messagesEndRef = useRef<HTMLDivElement>(null);


  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  // };

  // const LOADING_MESSAGE_ID = 'loading-message';

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatMessages]);

  // const handleImageQuery = () => {
  
  //   queryHuggingFaceModel();
  // }  


  // useEffect(() => {
  //   if (selectedImage !== null) {
  //     if (prevSelectedImageRef.current !== selectedImage) {
  //       queryHuggingFaceModel();
  //     }
  //     prevSelectedImageRef.current = selectedImage;
  //   }
    
    
  // }, [selectedImage, prevSelectedImageRef]);



  // Above is the code for germini
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-medical" size={28} color="red" />
        <Text style={styles.headerTitle}>Medimate</Text>
        <Ionicons name="ios-settings" size={28} color="black" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Medications</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="plus-box" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <MedicationItem
          iconType="triangle"
          medicationName="Furosemide"
          dosage="1 tablet"
          timing="1 Hour before or 2 hours after food       
                  Every morning, Every night"
        />
        <MedicationItem
          iconType="circle"
          medicationName="Acebutolol"
          dosage="2 tablets"
          timing="1 Hour before or 2 hours after food       
                  Every morning, Every night"
        />
        <MedicationItem
          iconType="star"
          medicationName="Captopril"
          dosage="1 tablet"
          timing="1 Hour before or 2 hours after food       
                  Every morning, Every night"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbfbfa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#000'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    color: '#000'
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  medInfo: {
    flex: 1,
    marginLeft: 10,
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
  }
});

export default ContactsScreen;
