function Footer ({ affiliate = false }) {
    return {
        $template: '#footer-template',
        affiliate: affiliate
    }
}