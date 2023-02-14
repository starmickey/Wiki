class ArticleDTO {
    constructor(id, title, content){
        this.id = String(id);
        this.title = String(title);
        this.content = String(content);
    }
}

exports.ArticleDTO = ArticleDTO;