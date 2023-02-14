class ArticleDTO {
    constructor(id, title, content){
        this.id = String(id);
        this.title = title;
        this.content = content;
    }
}

exports.ArticleDTO = ArticleDTO;