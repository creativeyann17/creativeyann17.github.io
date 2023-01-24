import { DataStore } from 'aws-amplify';
import { Article } from '../../models/index'

export const fetchArticleById = async (id: string) => {
    const articles = await DataStore.query(Article, (e) => e.name.eq(id))
    return articles[0] || new Article({name:id, likes:0, views:0})
}

export const updateArticleViews = async (id: string) => {
    const original = await fetchArticleById(id);
    await DataStore.save(
        Article.copyOf(original, updated => {
        updated.views = (original?.views || 0) +1
        })
    );
    return fetchArticleById(id);
}

export const updateArticleLikes = async (id: string) => {
    const original = await fetchArticleById(id);
    await DataStore.save(
        Article.copyOf(original, updated => {
        updated.likes = (original?.likes || 0) +1
        })
    );
    return fetchArticleById(id);
}