import { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoaderComponent from "../components/LoaderComponent";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // Updated state name to profileImage

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const formData = new FormData();
                formData.append('_id', userInfo._id);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                if (profileImage) {
                    formData.append('profileImage', profileImage); // Changed field name to profileImage
                }

                const res = await updateProfile(formData).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const onProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => { setName(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="profileImage"> {/* Changed controlId to profileImage */}
                    <Form.Label>Profile Image</Form.Label> {/* Changed label to Profile Image */}
                    <Form.Control type="file" onChange={onProfileImageChange} />
                </Form.Group>

                {profileImage && (
                    <Image src={URL.createObjectURL(profileImage)} alt="Profile" className="my-2 profile-image" style={{ 
                        width: '100px', // Adjust size as needed
                        height: '100px', // Adjust size as needed
                        objectFit: 'cover', // Ensure the image fills the circular container without distortion
                        borderRadius: '50%', // Apply round shape
                        padding:'10px'
                    }} />
                )}

                {isLoading && <LoaderComponent />}
                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ProfileScreen;
