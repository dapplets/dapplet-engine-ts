export class FeatureRegistry {

    private _storage = new Map<string, any>();

    constructor(features: any[]) {
        this.put(features);
    }

    public put(features: any[]) {
        for (const f of features) {
            const regKeys: string[] = f["REG_KEY"];
            if (!regKeys) throw new Error("Invalid feature class. The feature doesn't contain REG_KEY property.");
            const key = regKeys.join("|");
            this._storage.set(key, f);
        }
    }

    public get(regKeys: string[]) {
        const key = regKeys.join("|");
        const featureClass = this._storage.get(key);
        return featureClass;
    }
}

// let dappletTemplate
// let registry: FeatureRegistry = new FeatureRegistry();
// let module = registry.get([ETHEREUM_SUPPORT_FORMATTER_URI, HTML_MUSTASHE_VIEW]);

// // == inside DappletEngine view evaluation================
// let view = registry.get(HTML_MUSTASHE_VIEW);
// view.parse(dappletTemplate.views[0]).usedGlobalNames.forEach(globalName => {
//     let module = registry.get([globalName, view.globalName]);
// })
// // ==================