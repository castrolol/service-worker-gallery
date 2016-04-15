if ('serviceWorker' in navigator && navigator.onLine) {
    
    navigator.serviceWorker.register('cache-service.js').then(function(registration) {
 
        console.log('┌(˘⌣˘)ʃ ', registration.scope);
        
    }).catch(function(err) {
 
        console.log('ლ(ಠ_ಠლ)', err);
        
    });
}