import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';

const ChatScreen = ({ route }) => {
  const { animalId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://192.168.1.42:3000');

  useEffect(() => {

    fetch(`http://192.168.1.42:3000/messages/${animalId}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));


    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const chatMessage = {
      animalId,
      text: message,
    };
    socket.emit('sendMessage', chatMessage);
    setMessage('');
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Enter your message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
