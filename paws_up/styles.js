import { StyleSheet, Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
},
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    marginBottom: 120,
  },
  logo: {
    width: 180, 
    height: 180, 
  },
  mainScreenContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: windowWidth * 0.05, 
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: windowWidth * 0.05,
    marginVertical: 10,
    marginHorizontal: windowWidth * 0.1, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: windowHeight * 0.4,
    marginBottom: 10,
    borderRadius: 15,
    
  },
  infoContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#555', 
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitleText: {
    color: 'gray',
    fontSize: 14,
  },
  descriptionText: {
    color: 'black',
    marginTop: 10,
  },
  mainScreenButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    marginTop: 50, 
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postAnimalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  postAnimalScrollView: {
    alignItems: 'center',
    padding: 10,
  },
  postAnimalImageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  postAnimalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  postAnimalImageIndex: {
    position: 'absolute',
    bottom: 60,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowRadius: 10,
  },

  header: {

    alignItems: 'flex-start', 
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'left',
  },
  userIcon: {
    width: 30,
    height: 30,
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageAndThumbnailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    borderRadius: 10,
    borderWidth: 2,
    marginTop:0,
    borderColor: '#e0e0e0',
  },
  thumbnailListContainer: {
    paddingVertical: 10,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  arrowButton: {
    padding: 10,
    marginHorizontal: -10,
  },
 
  arrowIcon: {
    color: '#fff', 
  },
  paginationContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  paginationDot: {
    activeDotColor: '#fff', 
    inactiveDotColor: '#ccc',
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 10,
  },
  textBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  titleText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  descriptionText: {
    color: '#444',
    fontSize: 12,
    marginTop: 5,
  },
  messageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  messageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: windowWidth, 
    height: windowWidth, 
    borderRadius: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnailContainer: {
    width: windowWidth * 0.25,
    paddingRight: 10,
  },
  mainImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageAndArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  
  },

  cardContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: windowWidth * 0.05,
    marginVertical: 10,
    marginHorizontal: windowWidth * 0.1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2, 
  },
  cardImage: {
    width: '100%',
    height: windowHeight * 0.25, 
    borderRadius: 10,
  },
  cardTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'gray',
    fontSize: 16,
  },
  cardDescription: {
    color: '#555',
    fontSize: 14,
  },
  cardButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  postDetailContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  postDetailCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
    marginVertical: 10,
  },
  postDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  postDetailSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  postDetailDescription: {
    fontSize: 14,
    color: '#444',
  },
  sendMessageButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  sendMessageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingBottom: 20,
    height: 300, 
    width: '100%', 
    
    backgroundColor: 'transparent',
  },
  mapImage: {
    width: '90%', 
    height: '80%', 
    borderRadius: 10,
  },

suggestionsContainer: {
  suggestionsContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: 8,
    marginTop: 4, 
    zIndex: 10, 
    width: '100%', 
    borderColor: '#ccc',
    borderWidth: 1,
  },
},

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9', 
  },
  suggestionText: {
    color: 'black', 
  },
  
  
});
