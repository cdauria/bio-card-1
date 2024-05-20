import styles from '../components/bioCard.module.css'

const BioCard = ({ item }) => {
    return (
        <div className={styles.card}>
            {item.media && (
                <img src={item.media} alt={item.name} className={styles.image} />
            )}
            <div className={styles.details}>
                <div className={styles.header}>{item.name}</div>
                <div className={styles.separator}></div>
                <div><strong></strong> {item.acquisitionDate}</div>
                <div className={styles.separator}></div>
                <div><strong></strong> {item.storage}</div>
                <div className={styles.separator}></div>
                <div><strong></strong> {item.fragility}</div>
                <div className={styles.separator}></div>
                <div><strong></strong> {item.value}</div>
                <div className={styles.separator}></div>
                <div><strong></strong> {item.exhibition}</div>
            </div>
        </div>
    );
}

export default BioCard;
