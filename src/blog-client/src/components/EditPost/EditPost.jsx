import React from 'react';
import Label from '../Form/Label/Label';
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import Select from '../Form/Select/Select';
import Button from '../Button/Button';
import styles from './EditPost.module.css';
import Error from '../Error/Error';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCategories, getPostById, editPost } from '../../services/posts-service';
import Spinner from '../Spinner/Spinner';

function EditPost(props) {
    const postId = Number(props.match.params.id);
    const [formIsValid, setFormIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [post, setPost] = useState(null);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            getPost(postId);
            getCategories();
        }

        return () => {
            subscribed = false;
        }
    }, [postId]);

    async function getCategories() {
        let categories = await fetchCategories();
        setCategories(categories);
    }

    async function getPost(postId) {
        let post = await getPostById(postId);
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
    }

    if (categories === null || post === null) {
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
        await editPost(postId, title, content, category, setErrorMessage, setFormIsValid, props);
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
                <Button text="Edit" clicked={handleSubmit} />
            </form>
        </div>
    );
}

export default EditPost;