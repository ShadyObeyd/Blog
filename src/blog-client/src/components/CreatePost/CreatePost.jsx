import React from 'react';
import { useState } from 'react';
import Label from '../Form/Label/Label';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import styles from './CreatePost.module.css';
import Select from '../Form/Select/Select';
import { useEffect } from 'react';
import { fetchCategories, createPost } from '../../services/posts-service';
import Button from '../Button/Button';
import { useContext } from 'react';
import UserContext from '../../context';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

function CreatePost(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);
    const userContext = useContext(UserContext);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            getCategories();
        }

        return () => {
            subscribed = false;
        }
    }, []);

    async function getCategories() {
        let categories = await fetchCategories();
        setCategories(categories);
    }

    if (categories === null) {
        return <Spinner />
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        var userId = userContext.user.id;
        await createPost(title, content, category, userId, setFormIsValid, setErrorMessage, props);
    }

    if (!formIsValid) {
        setTimeout(() => {
            setFormIsValid(true);
        }, 4000);
    }

    return (
        <div className={styles.post}>
            <h1>Create Post</h1>
            <hr />
            {!formIsValid ? <Error errorMessage={errorMessage} /> : null}
            <form>
                <Label forr="title" text="Title" />
                <br />
                <Input id="title" type="text" changed={handleTitleChange} placeholder="title..." value={title} />
                <br />
                <Label forr="title" text="Content" />
                <br />
                <TextArea changed={handleContentChange} value={content} />
                <br />
                <Label forr="category" text="Category" />
                <br />
                <Select options={categories} changed={handleCategoryChange} value={category} />
                <br />
                <Button text="Create" clicked={handleSubmit} />
            </form>
        </div>
    );
}

export default CreatePost;