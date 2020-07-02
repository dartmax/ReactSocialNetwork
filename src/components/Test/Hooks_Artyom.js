import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";

import LoadingSpinner from "../../ui/loadingSpinner";

const FeatureInfoImage = (props) => {

    const {selectionFeatureInfo} = props;
    const [isLoading, toggleLoader] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        let featureGalleryImages = (selectionFeatureInfo.dbFeature.galleryEnabled && Array.isArray(selectionFeatureInfo.dbFeature.galleryImages)
            && selectionFeatureInfo.dbFeature.galleryImages.length) ? selectionFeatureInfo.dbFeature.galleryImages : [];
        setGalleryImages([{
            url: selectionFeatureInfo.featureThumbnailUrl(false, true),
            preview: selectionFeatureInfo.featureThumbnailUrl()
        },  // main image thumbnail
            ...featureGalleryImages.sort((a, b) => b.default - a.default) // sort by default
        ])
    }, [selectionFeatureInfo]);

    const changeImage = (index) => {
        toggleLoader(true);
        setActiveImageIndex(index)
    };

    const mainImageUrl = galleryImages[activeImageIndex];

    return (
        <div className="product-image">
            {galleryImages.length > 1 ? (
                <ul className={"product-image__gallery"
                + (galleryImages.length > 3 ? " product-image__gallery--more-that-three" : "")
                + (galleryImages.length > 6 ? " product-image__gallery--more-that-six" : "")}>
                    {galleryImages.map((gImg, index) => {
                        return <li className={"product-image__gallery-image" + (activeImageIndex === index ? " product-image__gallery-image--active" : "")}
                                   key={index}
                                   style={{backgroundImage: "url('" + (gImg.preview || gImg.url) + "')"}}
                                   onClick={() => changeImage(index)} />
                    })}
                </ul>
            ) : null}
            <div className="product-image__main">
                {isLoading || !mainImageUrl ? <LoadingSpinner/> : null}
                {mainImageUrl ? <img className={"product-image__main-image" + (isLoading ? " product-image__main-image--loading" : "")}
                                     onClick={() => window.open(mainImageUrl.url, "_blank")}
                                     src={mainImageUrl.url} onLoad={() => toggleLoader(false)} alt=""/> : null}
            </div>
        </div>
    )
};

const mapStateToProps = (store) => {
    return {
        selectionFeatureInfo: store.selectionState.selectionFeatureInfo,
        windowWidth: store.serverState.windowWidth,
    };
};

export default connect(mapStateToProps, {

})(FeatureInfoImage);