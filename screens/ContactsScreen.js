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
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactsPicker from "../components/contacts/ContactsPicker";
import EmergencyContactItem from "../components/contacts/EmergencyContactItem";
import { db } from "../firebase/firebase";
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

  const toggleModal = (bool) => {
    setIsModalVisible(bool);
  };

  useEffect(() => {
    const getEmergencyContacts = async () => {
      const q = query(
        collection(db, "users", getAuth().currentUser.uid, "emergencyContacts")
      );
      onSnapshot(q, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setEmergencyContacts(temp);
      });
    };
    getEmergencyContacts();
  }, [!isModalVisible]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#ffa45c",
        }}
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 35, fontWeight: "700", color: "white" }}>
            Emergency Contact
          </Text>
          <TouchableOpacity
            onPress={() => toggleModal(true)}
            style={styles.addContact}
          >
            <AntDesign name="adduser" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {emergencyContacts.length > 0 ? (
            <FlatList
              style={{
                width: "100%",
                height: "100%",
              }}
              data={emergencyContacts}
              renderItem={({ item, index }) => {
                return (
                  <EmergencyContactItem item={item} index={index} key={index} />
                );
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: "grey",
                textAlign: "center",
                width: "80%",
              }}
            >
              You have not added any emergency contacts.{"\n"}Click the top
              right icon to add an emergency contact.
            </Text>
          )}
        </View>
      </SafeAreaView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
      >
        <ContactsPicker
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          emergencyContacts={emergencyContacts}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    height: "8%",
  },
  addContact: {
    // left: 80,
    marginTop: 10,
  },
});
export default ContactsScreen;
