export interface SupplierProduct {
    "supplierId": number,
    "dataEnrichmentTypeId": number,
    "data": {
        "1": {
            "ingredients": string,
            "containAllergens": string,
            "storageInstructions": string
        }
    },
    "nutritionValues": {
        "sizes": [
            {
                "id": number,
                "names": {
                    "1": string
                }
            }
        ],
        "values": [
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": true
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            },
            {
                "id": number,
                "names": {
                    "1": string
                },
                "sizeValues": [
                    {
                        "sizeId": number,
                        "unitOfMeasure": {
                            "names": {
                                "1": string
                            }
                        },
                        "value": number,
                        "valueLessThan": false
                    }
                ]
            }
        ]
    },
    "isPrivate": false,
    "unitResolution": number,
    "productTagsData": [
        {
            "id": number,
            "isActive": true,
            "isVisible": true,
            "isRetailerRelation": true,
            "isGlobalRelation": false,
            "isGS1Relation": false,
            "isExcluded": false,
            "typeId": number,
            "showIconOnProductPageOnly": false
        },
        {
            "id": number,
            "isActive": false,
            "isVisible": false,
            "isRetailerRelation": false,
            "isGlobalRelation": true,
            "isGS1Relation": false,
            "isExcluded": false,
            "typeId": number,
            "showIconOnProductPageOnly": false,
            "names": {
                "1": {
                    "name": string,
                    "description": string
                },
                "2": {
                    "name": string,
                    "description": string
                },
                "5": {
                    "name": string,
                    "description": string
                }
            }
        },
        {
            "id": number,
            "isActive": true,
            "isVisible": true,
            "isRetailerRelation": false,
            "isGlobalRelation": false,
            "isGS1Relation": true,
            "isExcluded": false,
            "typeId": number,
            "showIconOnProductPageOnly": false,
            "names": {
                "1": {
                    "name": string,
                    "description": string
                },
                "2": {
                    "name": string,
                    "description": string
                },
                "4": {
                    "name": string,
                    "description": null
                }
            }
        },
        {
            "id": number,
            "isActive": false,
            "isVisible": false,
            "isRetailerRelation": false,
            "isGlobalRelation": false,
            "isGS1Relation": true,
            "isExcluded": false,
            "typeId": number,
            "showIconOnProductPageOnly": false,
            "names": {
                "1": {
                    "name": string,
                    "description": string
                },
                "2": {
                    "name": string,
                    "description": string
                },
                "4": {
                    "name": string,
                    "description": null
                },
                "5": {
                    "name": string,
                    "description": string
                }
            }
        }
    ],
    "localBarcode": string,
    "metaData": {
        "originCountries": [
            {
                "code": string,
                "names": {
                    "1": string
                }
            }
        ],
        "dataEffectiveTime": string
    },
    "isSuggested": false,
    "lastReview": string,
    "id": number,
    "department": {
        "id": number,
        "name": string,
        "externalId": number
    },
    "barcode": string,
    "brand"?: {
        "id": number,
        "names": {
            "1": string,
            "2": string
        }
    },
    "isCoupon": false,
    "gs1ProductId": number,
    "isOnHomePageCarousel": false,
    "original": {
        "isWeighable": false,
        "image": {
            "id": number,
            "url": string,
            "source": number,
            "isSilent": false,
            "tag": string,
            "isDefault": true,
            "typeId": number,
            "uploadedOn": string,
            "backupPath": string
        },
        "images": [],
        "data": {
            "1": {
                "ingredients": null,
                "containAllergens": null,
                "storageInstructions": null
            }
        },
        "nutritionValues": null,
        "nutritionFacts": null
    },
    "productId": number,
    "unitOfMeasure": {
        "id": number,
        "defaultName": string,
        "names": {
            "1": string,
            "2": string
        }
    },
    "productTagsById": {
        "2562": {
            "id": number,
            "sort": number,
            "typeId": number
        }
    },
    "tagById": {
        "2562": {
            "sort": number,
            "typeId": number
        }
    },
    "weight": number,
    "externalId": number,
    "retailerId": number,
    "tags": [
        number
    ],
    "isWeighable": false,
    "localName": string,
    "activeDays": number,
    "names": {
        "1": {
            "short": string,
            "long": string
        },
        "2": {
            "short": string,
            "long": string
        }
    },
    "numberOfItems": number,
    "promotionBanners": [
        {
            "id": number,
            "name": string,
            "url": string,
            "pictureUrl": string,
            "mobilePictureUrl": string,
            "retailerId": number
        },
        {
            "id": number,
            "name": string,
            "url": string,
            "pictureUrl": string,
            "mobilePictureUrl": string,
            "retailerId": number
        },
        {
            "id": number,
            "name": string,
            "url": string,
            "pictureUrl": string,
            "mobilePictureUrl": string,
            "retailerId": number
        }
    ],
    "_indexTimestamp": string,
    "family": {
        "id": number,
        "retailerId": null,
        "names": {
            "1": {
                "name": string
            },
            "2": {
                "name": string
            }
        },
        "searchKeywords": [
            "גבינה לבנה",
            "גבינה לבנה number%",
            "גבינה",
            "גבינה number%",
            "גבינה number%"
        ],
        "categoriesPaths": [
            [
                {
                    "id": number,
                    "names": {
                        "1": string,
                        "2": string
                    },
                    "keywords": []
                },
                {
                    "id": number,
                    "names": {
                        "1": string,
                        "2": string
                    },
                    "keywords": []
                },
                {
                    "id": number,
                    "names": {
                        "1": string,
                        "2": string
                    },
                    "keywords": []
                }
            ]
        ],
        "categories": [
            {
                "id": number,
                "names": {
                    "1": string,
                    "2": string
                },
                "keywords": []
            },
            {
                "id": number,
                "names": {
                    "1": string,
                    "2": string
                },
                "keywords": []
            },
            {
                "id": number,
                "names": {
                    "1": string,
                    "2": string
                },
                "keywords": []
            }
        ]
    },
    "isSubsidy": false,
    "productTags": [
        number,
        number
    ],
    "branch": {
        "id": number,
        "isForSaleExternal": true,
        "taxAmount": number,
        "regularPrice": number,
        "isEbtEligible": false,
        "isEbtCashEligible": false,
        "isActive": true,
        "markupPercentage": number,
        "isVisible": true,
        "posLastSellDate": string,
        "missingCounter": number,
        "branchProductId": number,
        "sellDateVisibleUntil": string,
        "aisleId": number,
        "aisleName": string,
        "aisleSort": number,
        "specials": [
            {
                "id": number,
                "description": string,
                "startDate": string,
                "endDate": string,
                "isCoupon": false,
                "limit": number,
                "hasOneProduct": false,
                "firstLevel": {
                    "type": number,
                    "firstPurchaseTotal": number,
                    "firstGift": {
                        "total": number
                    }
                },
                "names": {
                    "1": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    },
                    "2": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    },
                    "3": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    },
                    "4": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    },
                    "5": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    },
                    "6": {
                        "id": number,
                        "name": string,
                        "promotionTag": string
                    }
                }
            }
        ]
    }
}