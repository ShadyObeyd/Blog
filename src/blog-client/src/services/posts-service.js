import { baseUrl } from "../constants";

const postsUrl = baseUrl + '/posts';

export async function fetchCategories() {
    let promise = await fetch(postsUrl + '/categories');
    let res = await promise.json();

    return res;
}