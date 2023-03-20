import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description,imgUrl,newsUrl} = this.props;
        return (
            <div className=' my-5' style={{display : "flex",width : "100%",}}>
                <div className="card" style={{display : "block",width : "15rem",border : "2px black solid"}}>
                    <img width="500rem" height="" src={imgUrl?imgUrl:"https://img.generation-nt.com/daimler-eactros-longhaul-poids-lourd-electrique_029801BB01684420.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title small" style={{textAlign : "justify"}}>{title}</h5>
                        <hr/>
                        <p className="card-text small" style={{display : "block",textAlign : "justify"}}>{description}.....</p>
                        <div className="d-grid gap-2 col-6 mx-auto">
                        <a href={newsUrl} target="_blank"  className="btn btn-success btn-sm">MORE DETAIL</a>
                        </div>
                            
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default NewsItem