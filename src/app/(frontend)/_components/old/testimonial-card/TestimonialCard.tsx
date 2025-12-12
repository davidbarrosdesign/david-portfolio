import styles from "./TestimonialCard.module.scss";

export default function TestimonialCard({ data }: { data: any }) {
    return (
        <section className={styles.testimonials}>
            <div className={styles.testimonialsWrapper}>
                <div className={styles.testimonialsContent}>
                    <p>{data.testimonial}</p>
                </div>
                <div className={styles.testimonialsInfos}>
                    <span className={styles.testimonialsInfosName}>{data.title}</span>
                    <span className={styles.testimonialsInfosJob}>{data.jobTitle} {data.company}</span>
                </div>
            </div>
        </section>
    );
}