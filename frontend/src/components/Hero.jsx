import { Container, Card, Button } from 'react-bootstrap';
import  {LinkContainer}  from 'react-router-bootstrap';

import { useSelector } from 'react-redux';


const Hero = () => {

  const { userInfo } = useSelector( (state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          { userInfo ? 
            <>
              {userInfo.profilePicture && <img src={'http://localhost:5000/userProfilePictures/' + userInfo.profilePicture} 
              alt="User Image"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
              }} 
              />}
              <h2 className='text-center mb-4'> Welcome, <b>{userInfo.name}</b> </h2>
              <p className='text-center mb-4'> Email: {userInfo.email} </p>
              <div className='d-flex'>
                <LinkContainer to='/profile'>
                    <Button variant='primary' className='me-3'>
                    Manage Profile
                    </Button>
                </LinkContainer>
              </div>
            </>
            : 
            <>
              <h2 className='text-center mb-4'> User Login  </h2>
              <p className='text-center mb-4'> Please Login to access User Dashboard </p>
              <div className='d-flex'>
                <LinkContainer to='/login'>
                    <Button variant='primary' className='me-3'>
                    Login
                    </Button>
                </LinkContainer>
              </div>
            </> 
          }
        </Card>
      </Container>
    </div>
  );
};

export default Hero;